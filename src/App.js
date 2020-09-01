import React, {useState, useReducer} from 'react';
import './App.css';
import ChoosePlant from "./Components/ChoosePlant"
import PlantPlant from "./Components/PlantPlant"
import TendPlant from "./Components/TendPlant"

function App() {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {plant: "", sun: "", water: ""}
  )

  const step3 = state.plant && state.sun && state.water

  return (
    <div className="App">
      <h1>Plant Simulation</h1>

      {!state.plant && (<ChoosePlant options={plantData} plant={state.plant} setState={setState}/>)}
      {state.plant && (
        <PlantPlant state={state} setState={setState} sunValues={sunValues} waterValues={waterValues}/>
      )}
      {step3 && (
        <TendPlant userSettings={state}/>
      )}
    </div>
  );
}

// I think this data could be factored out into a JSON document
const plantData = [
  {
    name: "Cactus",
    sun: "Full Sun",
    sunValue: 10,
    water: "Weekly",
    waterValue: 2,
  },
  {
    name: "Fern",
    sun: "Full Shade",
    sunValue: 2,
    water: "Twice Daily",
    waterValue: 9,
  },
  {
    name: "Rose",
    sun: "Half Shade",
    sunValue: 5,
    water: "Daily",
    waterValue: 6,
  }
]

const sunValues = [
  {
    id: 1,
    description: "Full Shade",
    value: 2,
  },
  {
    id: 2,
    description: "Half Shade",
    value: 5,
  },
  {
    id: 3,
    description: "Full Sun",
    value: 10,
  }
]

const waterValues = [
  {
    id: 1,
    description: "Weekly",
    value: 2,
  },
  {
    id: 2,
    description: "Daily",
    value: 6
  },
  {
    id: 3,
    description: "Twice Daily",
    value: 9
  }
]

export default App;
