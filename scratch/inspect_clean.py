import joblib
import json
import os

backend_dir = r"c:\Users\Muhammad Al Fazri\Tubes 2026\Backend"
encoders_path = os.path.join(backend_dir, "label_encoders.pkl")

if os.path.exists(encoders_path):
    try:
        encoders = joblib.load(encoders_path)
        print("KEYS IN PKL:", list(encoders.keys()))
        result = {}
        for key, encoder in encoders.items():
            classes = list(encoder.classes_)
            # If classes contain thousands of misspelled variants, let's clean them or keep the top clean ones
            # but we need to know what they are. Let's filter classes that are common or just print the first 15 classes.
            result[key] = {
                "total_count": len(classes),
                "preview": classes[:20]
            }
        print(json.dumps(result, indent=2))
    except Exception as e:
        print("Error:", e)
else:
    print("label_encoders.pkl not found")
