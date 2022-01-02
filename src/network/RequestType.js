

export const request=(type,data,header)=>{

    const option={
        method: type, 
        body: data,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return option;
}