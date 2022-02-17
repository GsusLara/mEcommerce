const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			usuario:null,
			saludo:"Store Funciona"
		},
		actions: {
			setUser:(data)=>{
				console.log(data)
				setStore({usuario:data})
			},
			setSaludo: item => {
				setStore({ saludo:item });
			}
		}
	};
};

export default getState;
