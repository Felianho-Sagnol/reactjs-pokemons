const formatDate = (date: Date = new Date()): string => {
    return date.getDay().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()
}

export default formatDate