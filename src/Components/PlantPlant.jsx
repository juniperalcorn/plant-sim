import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Select from '@material-ui/core/Select';

const PlantPlant = ({state, setState, lightValues, waterValues}) => {
    const classes = useStyles()

    return(
        <div>
            <h3>Plant your {state.plant.name}</h3>
            <div className={classes.contain}>
                <div>
                    Select Light:
                    <Select
                        value={state.light}
                        onChange={(e) => setState({light: e.target.value})}
                        variant="outlined"
                        className={classes.select}
                    >
                        {lightValues.map(l => {
                            return <option value={l.description} className={classes.option}>{l.description}</option>
                        })}
                    </Select>
                </div>
                <div>
                    Select Water:
                    <Select
                        value={state.water}
                        onChange={(e) => setState({water: e.target.value})}
                        variant="outlined"
                        className={classes.select}
                    >
                        {waterValues.map(w => {
                            return <option value={w.description} className={classes.option}>{w.description}</option>
                        })}
                    </Select>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    contain:{
        display: "flex",
        justifyContent: "center"
    },
    select:{
        width: "300px",
        height: "40px",
        marginLeft: "5%"
    },
    option: {
        padding: "2%"
    }
})

export default PlantPlant