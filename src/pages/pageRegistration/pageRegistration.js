import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import img from '../../media/log.jpg';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const REGISTRETION_USER = gql`
    mutation reg($login: String, $password: String, $confirmPassword: String, $telephone: String) {
        RegistrationForUser(login: $login, telephone: $telephone, password: $password, confirmPassword: $confirmPassword) {
        _id
        login
        password
        telephone
        }
    }
`;

export default function PageRegistration(props) {
    const [login, setLogin] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setconfirmPassword] = React.useState('');

    const [RegistrationForUser, {data}] = useMutation(REGISTRETION_USER, {
        variables: {login, telephone, password, confirmPassword}
    });

    return (
        <>
        <Header />
        <main>
            <img src={img} id='img-log' alt="img" />
            <div id='wrapper-login'>
                <form>
                    <input type='text' onChange={(e) => setLogin(e.target.value)} placeholder='Логин' className='inputs'/>
                    <br/>
                    <input type='tel' onChange={(e) => setTelephone(e.target.value)} placeholder='Номер телефона' className='inputs' />
                    <br/>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Пароль' className='inputs' />
                    <br/>
                    <input type='password' onChange={(e) => setconfirmPassword(e.target.value)} placeholder='Повторите пароль' className='inputs' />
                    <br/>
                </form>
                <button onClick={RegistrationForUser}>Зарегистрироваться</button>
                {data ? <h4>Регестрация прошла успешно, теперь Вы можете войти в свой личный кабинет, введя эти данные</h4> : null}
                <br/>
                <h4>У вас уже есть аккаунт? <Link to='/login'>Войдите</Link></h4>   
            </div>
        </main>
        <Footer />
        </>
    )
}