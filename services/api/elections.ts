import { api } from "@/lib/axios"

export const getElections = async(year:number,stateId:number) => {
    if (stateId) {
        const res = await api.get(`/v2/elections?year=${year}&stateId=${stateId}`)
        console.log("elections",res.data,"state",stateId)
        return res.data.data
    }
    else{
        const res = await api.get(`/v2/elections?year=${year}`)
        console.log(res.data)
        return res.data.data
    }
}

export const getElectionYears = async() => {
    const res = await api.get("/v2/elections/years")
    return res.data.data
}

export const getElectionYearsByStates = async(year:number) => {
    const res = await api.get(`/v2/elections/states?year=${year}`)
    return res.data.data
}

export const getCandidatesByElections = async(id:number) => {
    console.log("api hitt")
    const res = await api.get(`/v2/elections/candidates?id=${id}`)
    console.log("api response",res.data)
    return res.data.data
}

export const getElectionCandidateDetails = async(id:number) => {
    const res = await api.get(`/v2/elections/candidate/details?id=${id}`)
    return res.data.data
}