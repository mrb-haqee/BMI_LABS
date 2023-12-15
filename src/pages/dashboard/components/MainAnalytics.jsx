import React from "react";
import { Recomendation as img } from "../../images/image";
import { TablePrediction } from "./TablePrediction";
import { RecomendContent } from "./RecomendContent";

export default function MainAnalytics({ dataPredict }) {
  if (Object.keys(dataPredict).length !== 0) {
    console.log("berisi");
  } else {
    console.log("kosong");
  }
  console.log(dataPredict[0]);
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Analytics</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">BMIPrediction</a>
            </li>
            <li>
              <i className="bx bx-chevron-right" />
            </li>
            <li>
              <a className="active" href="#">
                Analytics
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ul className="box-info">
        {!dataPredict || dataPredict.length === 0 ? (
          <p className="no-data">Tidak ada data</p>
        ) : (
          <>
            <li>
              <i className="bx bx-notepad"></i>
              <span className="text">
                <h3>Last BMI: {dataPredict[0].bmi}</h3>
                <p>{dataPredict[0].date}</p>
              </span>
            </li>
            <li>
              {dataPredict[0].predict === "underweight" ? (
                <>
                  {/* {" "} */}
                  <i className="bx bx-cookie"></i>
                  <span className="text">
                    <h3>{dataPredict[0].predict}</h3>
                    <p>Calories In: 2300-2700</p>
                    <p>Calories Out: 200-400</p>
                  </span>
                </>
              ) : dataPredict[0].predict === "normal" ? (
                <>
                  <i className="bx bx-street-view"></i>
                  <span className="text">
                    <h3>{dataPredict[0].predict}</h3>
                    <p>Calories In: 2100-2500</p>
                    <p>Calories Out: 200-600</p>
                  </span>
                </>
              ) : dataPredict[0].predict === "overweight" ? (
                <>
                  <i className="bx bx-dumbbell"></i>
                  <span className="text">
                    <h3>{dataPredict[0].predict}</h3>
                    <p>Calories In: 1600-2000</p>
                    <p>Calories Out: 300-500</p>
                  </span>
                </>
              ) : dataPredict[0].predict === "obesity" ? (
                <>
                  <i className="bx bx-run"></i>
                  <span className="text">
                    <h3>{dataPredict[0].predict}</h3>
                    <p>Calories In: 1300-1700</p>
                    <p>Calories Out: 400-600</p>
                  </span>
                </>
              ) : (
                <></>
              )}
            </li>
          </>
        )}
      </ul>
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Recomendation</h3>
          </div>
          {!dataPredict || dataPredict.length === 0 ? (
            <p className="no-data">Tidak ada Rekomendasi</p>
          ) : (
            <div className="recomend">
              <div className="rec-warp">
                {dataPredict[0].predict === "underweight" ? (
                  <>
                    <RecomendContent reco={"karbo"} />
                    <RecomendContent reco={"beban"} />
                    <RecomendContent reco={"air"} />
                    <RecomendContent reco={"buah"} />
                  </>
                ) : dataPredict[0].predict === "normal" ? (
                  <>
                    <RecomendContent reco={"kardio"} />
                    <RecomendContent reco={"karbo"} />
                    <RecomendContent reco={"buah"} />
                    <RecomendContent reco={"air"} />
                  </>
                ) : dataPredict[0].predict === "overweight" ? (
                  <>
                    <RecomendContent reco={"diet"} />
                    <RecomendContent reco={"kardio"} />
                    <RecomendContent reco={"beban"} />
                    <RecomendContent reco={"air"} />
                    <RecomendContent reco={"buah"} />
                  </>
                ) : dataPredict[0].predict === "obesity" ? (
                  <>
                    <RecomendContent reco={"diet"} />
                    <RecomendContent reco={"kardio"} />
                    <RecomendContent reco={"buah"} />
                    <RecomendContent reco={"air"} />
                  </>
                ) : (
                  <p className="no-data">Tidak ada data</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>Tabel Prediction</h3>
            <i className="bx bx-search" />
            <i className="bx bx-filter" />
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>BMI</th>
                <th>Prediction</th>
                <th>Date Prediction</th>
              </tr>
            </thead>
            <TablePrediction dataPredict={dataPredict} />
          </table>
          {!dataPredict || dataPredict.length === 0 ? (
            <p className="no-data">Tidak ada data</p>
          ) : (
            <></>
          )}
        </div>
        {/* <div className="todo">
          <div className="head">
            <h3>Todos</h3>
            <i className="bx bx-plus" />
            <i className="bx bx-filter" />
          </div>
          <ul className="todo-list">
            <li className="completed">
              <p>Todo List</p>
              <i class="bx bx-trash"></i>
            </li>
            <li className="completed">
              <p>Todo List</p>
              <i class="bx bx-trash"></i>
            </li>
            <li className="not-completed">
              <p>Todo List</p>
              <i class="bx bx-trash"></i>
            </li>
            <li className="completed">
              <p>Todo List</p>
              <i class="bx bx-trash"></i>
            </li>
            <li className="not-completed">
              <p>Todo List</p>
              <i class="bx bx-trash"></i>
            </li>
          </ul>
        </div> */}
      </div>
    </main>
  );
}
