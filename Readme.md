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



## Project Structure

- `main.ipynb`  

  Main Python notebook for data generation, preprocessing, model training, evaluation, anomaly score calculation, and SDN policy simulation.

- `requirements.txt`  

  Required Python packages for running the notebook.

- `sdn-demo/`  

  React demo folder for visualizing SDN concepts, anomaly detection, model results, and policy actions.

- `Presentation.pdf`  

  Final presentation file.

- `Presentation.pptx`  

  Editable PowerPoint presentation.

- `EvaluatingtheIsolation...pdf`  

  Main reference paper used for the project.

## Installation

Before running the Python notebook, install the required packages:

```bash
pip install -r requirements.txt
```
Then open and run 
```bash
main.ipynb
```
## Run the React Demo Locally
Go to the sdn_demo folder:

```bash
cd sdn-demo
```
Run the development server:
```bash
npm run dev
```

## Release

The first release of this project has been published on GitHub.

Release page:
```bash
https://github.com/MahsaHaghnevis/Isolation_Forest
```

The deployed React demo can also be accessed from the release description or directly through the live demo link.

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

In this simulation, the true label is used only for evaluation.
In a real SDN environment, the controller would not know the true label of live traffic.
Policy actions would be based only on the model prediction and anomaly score.

## Notes

The dataset is synthetic, so the result is based on a controlled setup.
This project is mainly for learning, presentation, and understanding how machine learning can be connected to SDN security.

For real-world deployment, the model should be tested on real network traffic and integrated with an actual SDN controller.

## Author

Prepared by: Mahsa Haghnevis & Fateme Hasan Nia