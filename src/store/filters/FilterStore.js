const FilterStore = {
    state: { 
        minDate: '',
        maxDate: '',
    },
    mutations: {  
        filterMinDate(state, minDatePayload) {
            state.minDate = minDatePayload;
        },
        filterMaxDate(state, maxDatePayload) {
            state.maxDate = maxDatePayload;
        }
    },
    actions: { 

    },
    getters: {  
        getMinDate(state) {
            return state.minDate
        },
        getMaxDate(state) {
            return state.maxDate
        }  
    }
}

export default FilterStore