import "./App.css";
import {ProfileData} from './data/profileData'
import { Tags } from "./Tags";

function App() {
  return (
    <div className="App flex-col items-center mt-7">
      <div className="border px-7 py-2">
          <h3 className="text-3xl underline">Data</h3>
          <ul className="flex flex-col">
            {
              ProfileData.map((data, index)=> {
                return (
                  <li key={index}>Name : {data.value}</li>
                )
              })
            }
          </ul>
        </div>
      <div className="Tags flex flex-col gap-y-4">
        <div className="heading">Search somthing on input field</div>
        <Tags />
      </div>
    </div>
  );
}

export default App;
