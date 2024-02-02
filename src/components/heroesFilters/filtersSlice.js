
import { useHttp } from "../../hooks/http.hook";
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

const filtersAdapter = createEntityAdapter({
    selectId: (filter) => filter.name,
});

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all',
//     filteredHeroes: []
// }

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})
// console.log(initialState);


export const fetchFilters = createAsyncThunk(
    //тип действия в формате: имя среза - тип действия
    'filters/fetchFilters',
    //функция которая должна вернуть promese(асинхронный код)
    async () => {
        const {request} = useHttp();
         return await request("http://localhost:3001/filters")
    }
)

const filterssSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        // filtersFetched: (state, action) => {
        //     state.filtersLoadingStatus = 'idle';
        //     state.filters = action.payload;
        // },
        // filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload);
                // state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer } = filterssSlice;

export default  reducer;

export const global = filtersAdapter.getSelectors(state => state.filters);

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);


export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
    
} = actions;