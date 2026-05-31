import joblib
import os

backend_dir = r"c:\Users\Muhammad Al Fazri\Tubes 2026\Backend"
encoders_path = os.path.join(backend_dir, "label_encoders.pkl")

if os.path.exists(encoders_path):
    try:
        encoders = joblib.load(encoders_path)
        print("Keys in label_encoders:")
        for key, encoder in encoders.items():
            print(f"\n{key}:")
            print(list(encoder.classes_))
    except Exception as e:
        print("Error loading encoders:", e)
else:
    print("label_encoders.pkl not found at", encoders_path)
