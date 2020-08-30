import React, {useState, useReducer} from 'react';
import './App.css';
import ChoosePlant from "./Components/ChoosePlant"
import PlantPlant from "./Components/PlantPlant"

function App() {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {plant: "", sun: "", water: ""}
  )

  return (
    <div className="App">
      <h1>Plant Simulation</h1>

      {!state.plant && (<ChoosePlant options={plantData} plant={state.plant} setState={setState}/>)}
      {!!state.plant && (
        <PlantPlant state={state} setState={setState} lightValues={lightValues} waterValues={waterValues}/>
      )}
    </div>
  );
}

const plantData = [
  {
    name: "Cactus",
    light: "Full Sun",
    water: "Weekly",
  },
  {
    name: "Fern",
    light: "Full Shade",
    water: "Twice Daily",
  },
  {
    name: "Rose",
    light: "Half Shade",
    water: "Daily",
  }
]

const lightValues = [
  {
    id: 1,
    description: "Full Shade",
  },
  {
    id: 2,
    description: "Half Shade"
  },
  {
    id: 3,
    description: "Full Sun"
  }
]

const waterValues = [
  {
    id: 1,
    description: "Weekly"
  },
  {
    id: 2,
    description: "Daily"
  },
  {
    id: 3,
    description: "Twice Daily"
  }
]

export default App;
