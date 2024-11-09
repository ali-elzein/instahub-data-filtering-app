import pymysql
import json
import boto3
import decimal

def get_db_conn():
    # Retrieve the encrypted database secrets from Secrets Manager
    secret_name = "prod/Instahub/mySQL"
    region_name = "us-east-2"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name=region_name)

    get_secret_value_response = client.get_secret_value(SecretId=secret_name)

    secret = get_secret_value_response['SecretString']
    secret_dict = json.loads(secret)

    # Connect to the database using the retrieved credentials
    conn = pymysql.connect(
        host= secret_dict['host'],
        user= secret_dict['username'],
        password= secret_dict['password'],
        database= secret_dict['dbInstanceIdentifier'],
        port= int(secret_dict['port'])
    )

    return conn

# Create a list of dictionaries, each representing a row
def get_results_as_json(cursor, rows):
    json_data = []
    
    for row in rows:
        row_dict = {}
        for i, column in enumerate(cursor.description):
            # Convert Decimal values to strings before adding to the dictionary
            if isinstance(row[i], decimal.Decimal):
                row_dict[column[0]] = str(row[i])
            else:
                row_dict[column[0]] = row[i]
        json_data.append(row_dict)

    return json_data