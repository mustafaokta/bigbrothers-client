import React, { FC, useCallback, useContext, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import classNames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/authContext';
import useDarkMode from '../../../hooks/useDarkMode';
import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Logo from '../../../components/Logo';
import Button from '../../../components/bootstrap/Button';
import Alert from '../../../components/bootstrap/Alert';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Spinner from '../../../components/bootstrap/Spinner';
import { registerUser } from '../../../helpers/connections/auth';
import { toast } from "react-toastify";
import { useUserContext } from '../../../context/UserContext';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Merhaba,</div>
			<div className='text-center h4 text-muted mb-5'>Devam etmek için giriş yapınız!</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: NextPage<ILoginProps> = ({ isSignUp }) => {
	const router = useRouter();

	const { setUser } = useContext(AuthContext);
	const { user, loginUser } = useUserContext();

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);

	const handleOnClick = useCallback(() => router.push('/'), [router]);
	const handleRegisterAction = (params:any)=> {
		const name =   params.signupName; // tbName?.current?.value;
		const surname =   params.signupSurname; // tbName?.current?.value;
		const email =   params.signupEmail;// tbEmail?.current?.value;
		const password = params.signupPassword; // tbPassword?.current?.value;

		const postData = {
		  name: String(name),
		  surname: String(surname),
		  email: String(email),
		  password: String(password),
		};

		registerUser(postData)
		  .then((res) => {
			// toast.success(`Başarıyla kayıt oldunuz. Girişe yönlendiriliyorsunuz.`);
			router.push("/login");
		  })
		  .catch((err) => {
			console.log("error");
		// 	toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
		  });
	  };


	const usernameCheck = (username: string) => {
		return !!getUserDataWithUsername(username);
	};

	const passwordCheck = (username: string, password: string) => {
		return getUserDataWithUsername(username).password === password;
	};

	const formikSignUp = useFormik({
		enableReinitialize: true,
		initialValues: {
			signupEmail:"",
			signupName: "",
			signupSurname: "",
			signupPassword:""
		},
		validate: (values) => {
			const errors: { signupEmail?: string; signupName?: string; signupSurname?: string; signupPassword?: string } = {};

			if (!values.signupEmail) {
				errors.signupEmail = 'Required';
			}

			if (!values.signupName) {
				errors.signupName = 'Required';
			}
			if (!values.signupSurname) {
				errors.signupSurname = 'Required';
			}
			if (!values.signupPassword) {
				errors.signupSurname = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => { handleRegisterAction(values);
	/* 		if (usernameCheck(values.loginUsername)) {
				if (passwordCheck(values.loginUsername, values.loginPassword)) {
					if (setUser) {
						setUser(values.loginUsername);
					}

					handleOnClick();
				} else {
					formikLogin.setFieldError('loginPassword', 'Username and password do not match.');
				}
			} */
		},
	});
	const formikLogin = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			handleLoginAction();
			/* if (usernameCheck(values.loginUsername)) {
				if (passwordCheck(values.loginUsername, values.loginPassword)) {
					if (setUser) {
						setUser(values.loginUsername);
					}

					handleOnClick();
				} else {
					formikLogin.setFieldError('loginPassword', 'Username and password do not match.');
				}
			} */
		},
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);


		/* setTimeout(() => {
			if (
				!Object.keys(USERS).find(
					(f) => USERS[f].username.toString() === formikLogin.values.loginUsername,
				)
			) {
				formikLogin.setFieldError('loginUsername', 'No such user found in the system.');
			} else {
				setSignInPassword(true);
			}
			setIsLoading(false);
		}, 1000); */
	};


	const handleLoginAction = () => {
		 // const email = tbEmail?.current?.value;
		 // const password = tbPassword?.current?.value;

		const postData = {
		  email: String(formikLogin.values.loginUsername),
		  password: String(formikLogin.values.loginPassword),
		};
		loginUser(postData);
	  };

	return (
		<PageWrapper
			isProtected={false}
			className={classNames({ 'bg-dark': !singUpStatus, 'bg-light': singUpStatus })}>
			<Head>
				<title>{singUpStatus ? 'Sign Up' : 'Login'}</title>
			</Head>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										href='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={250} /> 
{/* 										{process.env.NEXT_PUBLIC_COMPANY_NAME === 'Bigbrothers' && <Logo width={250} /> }
 */}										{/* {process.env.NEXT_PUBLIC_COMPANY_NAME === 'Tigersson' && 'Tigersson Travel' } */}
									
									</Link>
								</div>

								{/* Tab menu */}
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													/* setSignInPassword(false);
													setSingUpStatus(!singUpStatus); */
												}}>
												Tur Yönetim Sistemi
											</Button>
										</div>
								{/* 		<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Sign Up
											</Button>
										</div> */}
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />

								<Alert isLight  isDismissible>
									<div className='row'>
									<div className='col-12' style={{ textAlign: 'center' }}>
										Sisteme kayıtlı kullanıcınız yok ise lütfen yöneticiniz ile iletişime geçiniz.
									</div>

									</div>
								</Alert>
								<form className='row g-4'>

										<>
											<div className='col-12'>
												<FormGroup
													id='loginUsername'
													isFloating
													label='E-posta'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														value={formikLogin.values.loginUsername}
														isTouched={formikLogin.touched.loginUsername}
														invalidFeedback={
															formikLogin.errors.loginUsername
														}
														isValid={formikLogin.isValid}
														onChange={formikLogin.handleChange}
														onBlur={formikLogin.handleBlur}
														onFocus={() => {
															formikLogin.setErrors({});
														}}
													/>
												</FormGroup>
												{/*signInPassword && (
													<div className='text-center h4 mb-3 fw-bold'>
														Hi, {formikLogin.values.loginUsername}.
													</div>
												)*/}
												<FormGroup
													id='loginPassword'
													isFloating
													label='Parola'
												/* 	className={classNames({	'd-none': !signInPassword,})} */
													>
													<Input
														type='password'
														autoComplete='current-password'
														value={formikLogin.values.loginPassword}
														isTouched={formikLogin.touched.loginPassword}
														invalidFeedback={
															formikLogin.errors.loginPassword
														}
														validFeedback='Looks good!'
														isValid={formikLogin.isValid}
														onChange={formikLogin.handleChange}
														onBlur={formikLogin.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={formikLogin.handleSubmit}>
														Giriş Yap
													</Button>

											</div>
										</>


								</form>
							</CardBody>
						</Card>
						{/* Footer */}
						<div className='text-center'>
							<Link
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Privacy policy
							</Link>
							<Link
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Terms of use
							</Link>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});


export default Login;
