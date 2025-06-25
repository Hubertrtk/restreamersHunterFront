export const converToAssignUsers = (users, monitors, type) => {
	let monitorsUser = {}
	for(const {name, status} of monitors) {
		if(status){
			monitorsUser[name] = status
		}
	}
	switch (type) {
		case "EMAIL":
			return users.map(email => {
				return {
					email,
					monitors: monitorsUser,
				}
			})
		case "WMTID":
			return users.map(wmtId => {
				return {
					wmtId,
					monitors: monitorsUser,
				}
			})
		default:
		  throw new Error(`Unknown type: ${type}`);
	  }


}