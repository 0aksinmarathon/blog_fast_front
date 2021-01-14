import React, {Component, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    alert: {
        color: 'red',
        fontSize: 14
    }
});

function LoginPageF(props) {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, Fail] = useState(false);
    const history = useHistory()

    const login = async (emailAddress, password) => {
        console.debug('login')
        try{
            const params = new URLSearchParams();
            params.append('username', emailAddress)
            params.append('password', password)
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/token`, params)
            console.debug(res)
            localStorage.setItem('Authorization', `Bearer ${res.data.access_token}`)
            history.push('/')
        } catch (error) {
            console.debug(error)
            console.debug(error.response)
            Fail(true)
        };
    }  

    const handleSubmit = (e) => {
        e.preventDefault()
        login(emailAddress, password)
    }

    const {classes} = props;
    return (
        <React.Fragment>

            <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    { loginFailed ?
                        <p className={classes.alert}>Invalid email address or password</p>
                        : ''
                    }
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="username" autoFocus value={emailAddress}
                                   onChange={(e) => setEmailAddress(e.target.value)}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                value={password}
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="raised"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Log In
                        </Button>
                    </form>
                </Paper>
            </main>
        </React.Fragment>
    );

}

export default withStyles(styles)(LoginPageF);
