import urllib.request
import json

url = "http://127.0.0.1:8000/predict"
data = {
    "Project_Type": "Analytics",
    "Cloud_Service": "AWS S3",
    "Service_Category": "Compute",
    "Billing_Period": "Monthly",
    "Required_CPU_Hours": 372.0,
    "Actual_CPU_Hours": 372.0,
    "CPU_Utilization": 50.0,
    "Storage_Used_GB": 250.0,
    "Storage_Cost": 10.0,
    "Compute_Cost": 50.0,
    "Network_Cost": 20.0,
    "Region": "US-East-1",
    "Owner_Team": "DevOps",
    "Instance_Status": "Running",
    "Remarks": "Optimal"
}

print("Sending request to local API using urllib...")
req = urllib.request.Request(
    url, 
    data=json.dumps(data).encode('utf-8'), 
    headers={'Content-Type': 'application/json'},
    method='POST'
)

try:
    with urllib.request.urlopen(req) as response:
        status_code = response.status
        body = response.read().decode('utf-8')
        print("Status Code:", status_code)
        print("Response JSON:")
        print(json.dumps(json.loads(body), indent=2))
except Exception as e:
    print("Error connecting to API:", e)
