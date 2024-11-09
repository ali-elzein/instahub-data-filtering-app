import json
import boto3
import pymysql
from Instahub_util import get_db_conn, get_results_as_json

FILTERS = ['device_id', 'timestamp', 'temperature', 'humidity', 'light', 'motion']

class Params:
    def _init_(self):
        self.page_size = ""
        self.page_number = ""     
        self.sort_by = ""
        self.summary = ""
        self.start_filters = {}
        self.end_filters = {}

# Get pagination parameters from the event (e.g., API Gateway request)
def get_params(event):
    param = Params()  

    param.page_size = ""
    param.page_number = ""     
    param.sort_by = ""
    param.summary = ""
    try:    param.page_size = int(event['params']['querystring']['pageSize'])
    except KeyError as e: pass 
    try:    param.page_number = int(event['params']['querystring']['pageNumber'])
    except KeyError as e: pass 
    try:    param.sort_by = event['params']['querystring']['sortBy']
    except KeyError as e: pass 
    try:    param.summary = event['params']['querystring']['summary']
    except KeyError as e: pass 

    param.start_filters = {}
    param.end_filters = {}
    for k in FILTERS:
        try:    param.start_filters[k] = event['params']['querystring'][k+'-start']
        except KeyError as e: pass
        try:    param.end_filters[k]   = event['params']['querystring'][k+'-end']
        except KeyError as e: pass   

    return param

def construct_sql(param):
    sql = " SELECT id, device_id, CAST(timestamp AS char) AS timestamp, temperature, humidity, light, motion \
            FROM time_series_data "

    if param.start_filters or param.end_filters:
        filter_conditions = []
        for k, v in param.start_filters.items():
            filter_conditions.append(f"{k} >= %s")
        for k, v in param.end_filters.items():
            filter_conditions.append(f"{k} <= %s")
        sql += " WHERE " + " AND ".join(filter_conditions)
    
    return sql, tuple(param.start_filters.values()) + tuple(param.end_filters.values())
    
    return sql

def construct_sql_order(sql, sort_by):
    sql += " ORDER BY "+ sort_by +" ASC "
    return sql

def construct_sql_paginated(sql, args, page_size, offset):
    sql += " LIMIT %s OFFSET %s "
    return sql, args + (page_size, offset)

def construct_sql_summary(sql):
    sql = """ SELECT 
        COUNT(*) AS total_records,

        MIN(temperature) AS min_temperature,
        MAX(temperature) AS max_temperature,
        AVG(temperature) AS avg_temperature,
        
        MIN(humidity) AS min_humidity,
        MAX(humidity) AS max_humidity,
        AVG(humidity) AS avg_humidity,
        
        MIN(light) AS min_light,
        MAX(light) AS max_light,
        AVG(light) AS avg_light,
        
        MIN(motion) AS min_motion,
        MAX(motion) AS max_motion,
        AVG(motion) AS avg_motion

        FROM ("""+ sql +""") AS filtered_data
    """ 
    return sql

def lambda_handler(event, context):
    param = get_params(event)
    sql, args = construct_sql(param)
    if param.sort_by:
        sql = construct_sql_order(sql, param.sort_by)
    if param.page_size and param.page_number:
        sql, args = construct_sql_paginated(sql, args, param.page_size, (param.page_number - 1) * param.page_size)
    if param.summary:
        sql = construct_sql_summary(sql)

    try:
        conn = get_db_conn()

        with conn.cursor() as cursor:
            cursor.execute(sql, args)
            rows = cursor.fetchall()

        json_data = get_results_as_json(cursor, rows)

        conn.close()

        return {
            'statusCode': 200,
            'body': json.dumps(json_data)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
