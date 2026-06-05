import joblib
import numpy as np

model = joblib.load("model_prediksi_biaya.pkl")

# Generate extreme input scenarios
# Columns order: Storage_Used_GB, Required_CPU_Hours, Actual_CPU_Hours, CPU_Utilization_%, Region, Billing_Period, Service_Category, Instance_Status, CPU_Efficiency
# Region: 0 to 10
# Billing_Period: 0 to 5
# Service_Category: 0 to 800+
# Instance_Status: 0 to 12

min_input = np.array([[1.0, 1.0, 1.0, 1.0, 0, 0, 0, 0, 1.0]])
max_input = np.array([[999.0, 744.0, 744.0, 99.0, 10, 5, 200, 12, 1.0]])
mid_input = np.array([[500.0, 372.0, 372.0, 50.0, 5, 3, 100, 6, 1.0]])

print("--- Predict Extreme Cases ---")
print("Min input prediction:", model.predict(min_input)[0])
print("Max input prediction:", model.predict(max_input)[0])
print("Mid input prediction:", model.predict(mid_input)[0])
