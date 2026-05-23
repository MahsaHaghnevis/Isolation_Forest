# SDN Anomaly Detection with Isolation Forest

This is my Computer Networks course project about anomaly detection in Software-Defined Networking (SDN).

The project is based on the paper **“Evaluating the Isolation Forest Method for Anomaly Detection in Software-Defined Networking Security.”**

It includes a short paper review, a Python implementation of the Isolation Forest model, evaluation results, and a React demo for visualizing the main idea.

## Project parts

- Paper review
- Synthetic SDN traffic generation
- Data preprocessing with `StandardScaler`
- Anomaly detection using `Isolation Forest`
- Model evaluation with accuracy, precision, recall, F1-score, and confusion matrix
- Simulated SDN alert and policy actions
- Interactive React demo

## Result

Final test result:

```text
Accuracy: 99.33%

Confusion Matrix:
[[268   2]
 [  0  30]]
```

The model detected all anomalous samples in the test set, with two false alerts.

## Notes

The dataset is synthetic, so the result is based on a controlled setup.
This project is mainly for learning, presentation, and understanding how machine learning can be connected to SDN security.

#Author

Prepared by: Mahsa Haghnevis & Fateme Hasan Nia