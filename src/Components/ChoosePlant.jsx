import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Select from '@material-ui/core/Select';

const ChoosePlant = ({plant, setState, options}) => {
    const classes = useStyles()
    return(
    <div>
        Select a plant to care for:
        <Select
            value={plant}
            onChange={(e) => setState({plant: e.target.value})}
            variant="outlined"
            className={classes.select}
        >
            {options.map(o => {
                return <option value={o} className={classes.option}>{o.name}</option>
            })}

        </Select>
    </div>)
}

const useStyles = makeStyles({
    select:{
        width: "300px",
        height: "40px",
        marginLeft: "5%"
    },
    option: {
        padding: "2%"
    }
})

export default ChoosePlant