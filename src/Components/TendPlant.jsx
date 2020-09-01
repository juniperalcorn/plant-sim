import React, {useState, useEffect} from "react"
import {makeStyles} from "@material-ui/core/styles"
import LinearProgress from '@material-ui/core/LinearProgress';

// compare sun vs water; 
// based on sun, reduce water progressively at a certain rate


const TendPlant = ({userSettings}) => {
    const classes = useStyles()
    const [waterLevel, setWaterLevel] = useState(userSettings.water.value)
    const [waterWarning, setWaterWarning] = useState(false)
    const [lifeScore, setLifeScore] = useState()

    // I'd like to work on adding a setTimeout feature that reduces plant life periodically
    // in my work, we use `useDebounce`, but this is for search terms/values that change
    // here, a change in value shouldn't be the trigger, rather the timeout should be
    // I suspect useEffect is the right place to start, but I'm not sure.

    useEffect(() => {
        const lifeLevel = plantLife(waterLevel)
        setLifeScore(lifeLevel)
    }, [waterLevel])

    const plantLife = (waterLevel) => {
        const preferredWater = userSettings.plant.waterValue
        const actualWater = waterLevel
        const waterScore = evaluateElementalDifference(preferredWater, actualWater)

        const preferredSun = userSettings.plant.sunValue
        const actualSun = userSettings.sun.value
        const sunScore = evaluateElementalDifference(preferredSun, actualSun)

        const sunWaterRatio = evaluateSunWaterRatio(actualSun, actualWater)

        const lifeScore = 100 - waterScore - sunScore - sunWaterRatio
        return lifeScore < 0 ? 0 : lifeScore
    }

    // I'd love to imagine a more sophisticated algorithm/s for understanding the ration between
    // the settings and the actual sun/water, and their interplay...
    const evaluateElementalDifference = (pref, act) => {
        const difference = Math.abs(pref-act)
        if (difference > 2){
            return difference * 10
        } else return 0
    }

    const evaluateSunWaterRatio = (sun, water) => {
        const thirsty = water > 5
        if (thirsty){
            if (sun > 5) return 30
            if (sun === 5) return 20
        } else {
            if (sun < 5) return 10
        }
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