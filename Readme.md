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

## Installation

Before running the Python notebook, install the required packages:

```bash
pip install -r requirements.txt
```

## Result

Final test result:

```text
Accuracy: 81.33%

Confusion Matrix:
[[236  34]
 [ 22   8]]
```

The model correctly classified 236 normal samples and detected 8 anomalous samples.  
However, it also produced 34 false alerts and missed 22 real anomalies.

For the SDN policy simulation, the model produced the following actions:

```text
No action                              258
Block or rate-limit suspicious flow     30
Generate alert and monitor flow         12
```

## Notes

The dataset is synthetic, so the result is based on a controlled setup.
This project is mainly for learning, presentation, and understanding how machine learning can be connected to SDN security.

## Author

Prepared by: Mahsa Haghnevis & Fateme Hasan Nia