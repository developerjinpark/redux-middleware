import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
// import axios from 'axios';
import * as postActions from './modules/post';


class App extends Component {
    // loadData = () => {
    //     const { PostActions, number } = this.props;
    //     PostActions.getPost(number).then(
    //         (response) => {
    //             console.log(response);
    //         }
    //     ).catch(
    //         (error) => {
    //             console.log(error);
    //         }
    //     )
    // }

    // using ES7
    loadData = async () => {
        const { PostActions, number } = this.props;
        try {
            const response = await PostActions.getPost(number);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
    
    componentDidMount() {
        // axios.get('https://jsonplaceholder.typicode.com/posts/1')
        //     .then(response => console.log(response));
        this.loadData();
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.number !== prevProps.number) {
            this.loadData();
        }
    }
    render() {
        const { CounterActions, number, post, loading, error } = this.props;

        
        return (
            <div>
                <h1>{number}</h1>
                {
                    loading 
                        ? (<h2>loading...</h2>) 
                        : (
                            error 
                                ? (<h2>error!</h2>) 
                                : (
                                    <div>
                                        <h2>{post.title}</h2>
                                        <p>{post.body}</p>
                                    </div>
                                )
                        )
                }
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        post: state.post.data,
        loading: state.post.pending,
        error: state.post.error
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);