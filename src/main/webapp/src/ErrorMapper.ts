export default class ErrorMapper
{
    static map(error:any, state:any){
        if (error.response && error.response.status === 400) {
            state.setState({errors: new Map(Object.entries(error.response.data))});
        }
    }
}