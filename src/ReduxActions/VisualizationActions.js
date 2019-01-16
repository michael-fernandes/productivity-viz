export const DISTRACTION_COUNT = "DISTRACTION_COUNT"

export const distractionCount = (focuses) => {
    return {
        type: DISTRACTION_COUNT,
        focuses: focuses,
    }
}