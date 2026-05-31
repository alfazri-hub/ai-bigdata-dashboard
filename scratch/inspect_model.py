import joblib
import json

model_path = "../Backend/model_prediksi_biaya.pkl"
try:
    model = joblib.load(model_path)
    print("Model class:", type(model))
    booster = model.get_booster()
    config = json.loads(booster.save_config())
    print("\nBooster config keys:")
    print(list(config.keys()))
    
    # Print the model features
    if 'learner' in config and 'learner_model_param' in config['learner']:
        print("\nLearner model param:")
        print(config['learner']['learner_model_param'])
        
    print("\nNumber of features expected by booster:", booster.num_features())
    
    # Try to print feature names or get dump
    dump = booster.get_dump()
    if dump:
        print("\nSample tree dump (first 300 chars):")
        print(dump[0][:300])
        
except Exception as e:
    print("Error:", e)
