import React, {useState, useEffect} from "react"
import {makeStyles} from "@material-ui/core/styles"
import LinearProgress from '@material-ui/core/LinearProgress';


const TendPlant = ({userSettings}) => {
    const classes = useStyles()
    const [waterLevel, setWaterLevel] = useState(userSettings.water.value)
    const [waterWarning, setWaterWarning] = useState(false)
    const [lifeScore, setLifeScore] = useState()

    useEffect(() => {
        const lifeLevel = plantLife(waterLevel)
        setLifeScore(lifeLevel)
    }, [waterLevel])

    const plantLife = (waterLevel) => {
        const preferredWater = userSettings.plant.waterValue
        const actualWater = waterLevel
        const waterScore = evaluateElementalDifference(preferredWater, actualWater)

        console.log("waterScore: ",waterScore)
        const preferredSun = userSettings.plant.sunValue
        const actualSun = userSettings.sun.value
        const sunScore = evaluateElementalDifference(preferredSun, actualSun)
        console.log("sunScore: ", sunScore)
        const lifeScore = 100 - waterScore - sunScore
        console.log("life score: ", lifeScore)
        return lifeScore
    }

    const evaluateElementalDifference = (pref, act) => {
        const difference = Math.abs(pref-act)
        if (difference > 2){
            return difference * 10
        } else return 0
    }
    return (
        <div>
            <h3>Tend your {userSettings.plant.name}</h3>
            <div>
                <div className={classes.progressRow}>
                    <button onClick={() => {
                        if (waterLevel < 10) setWaterLevel(waterLevel + 1)
                        if (waterLevel === 10) setWaterWarning(true)
                    }}>
                        Water plant
                    </button>
                    Current water level
                    <LinearProgress 
                        variant="determinate"
                        value={waterLevel * 10}
                        className={classes.progressBar}
                    />
                    {waterWarning && (<span>You can't water your plant any more!</span>)}
                </div>

                <div className={classes.progressRow}>
                    Plant life meter
                    <LinearProgress 
                        variant="determinate"
                        value={lifeScore}
                        className={classes.progressBar}
                    />

                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    progressRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    progressBar: {
        width: "50%"
    }
})

export default TendPlant