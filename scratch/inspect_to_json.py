import joblib
import json
import os

backend_dir = r"c:\Users\Muhammad Al Fazri\Tubes 2026\Backend"
encoders_path = os.path.join(backend_dir, "label_encoders.pkl")
output_path = r"c:\Users\Muhammad Al Fazri\Tubes 2026\ai-bigdata-dashboard\scratch\encoders.json"

if os.path.exists(encoders_path):
    try:
        encoders = joblib.load(encoders_path)
        result = {}
        for key, encoder in encoders.items():
            result[key] = list(encoder.classes_)
        
        with open(output_path, "w") as f:
            json.dump(result, f, indent=2)
        print("Success! JSON written to", output_path)
    except Exception as e:
        print("Error:", e)
else:
    print("label_encoders.pkl not found")
