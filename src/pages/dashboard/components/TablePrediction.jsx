import React from "react";
import { Foto as img } from "../../images/image";

export function TablePrediction({ dataPredict }) {
  if (!dataPredict || dataPredict.length === 0) {
    return <></>;
  }
  return (
    <tbody>
      {dataPredict.map((data, i) => {
        return (
          <tr key={i+1}>
            <td>
              <img src={img.foto} alt="Foto" />
              <p>{data.email}</p>
            </td>
            <td>{data.bmi}</td>
            <td>
              <span className={`status ${data.predict}`}>{data.predict}</span>
            </td>
            <td>{data.date}</td>
          </tr>
        );
      })}
    </tbody>
  );
}
