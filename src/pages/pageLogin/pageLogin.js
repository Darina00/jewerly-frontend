import React from 'react';
import {Link} from 'react-router-dom';
import './pageLogin.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import img from '../../media/log.jpg';
import auth from '../../components/protectedRouter/Auth';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const LOGIN_USER = gql`
mutation LogInForUser($login: String, $password: String) {
    LogInForUser(login: $login, password: $password) {
        _id 
        token
    }
}
`;

export default function PageLogin(props) {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [LogInForUser, {data}] = useMutation(LOGIN_USER, {
        variables: {login, password}
    });

    if(data) {  
        localStorage.setItem('AuthToken', data.LogInForUser.token);
        localStorage.setItem('IDuser', data.LogInForUser._id);

        localStorage.setItem('ArrayGoods', JSON.stringify([]));
        localStorage.setItem('ArrayPrices', JSON.stringify([]));
        auth.login(() => { 
           props.history.push(`/account`);
        }) 
    }

      return (
        <>
            <Header />
            <main>
                <img src={img} id='img-log' alt="img" />
                <div id='wrapper-login'>
                    <form>
                        <input type='text' onChange={(e) => setLogin(e.target.value)} placeholder='Логин' className='inputs'/>
                        <br/>
                        <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' className='inputs' />
                        <br/>
                    </form>
                    <button onClick={LogInForUser}>Войти</button>
                    <h4>У вас ещё нет аккаунта? <Link to='/registration'>Зарегистрируйтесь</Link></h4>   
                </div>
            </main>
            <Footer />
        </>
    )     
}