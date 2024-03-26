import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import data from '../data/dummyCustomerData';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import { useForm, Controller } from 'react-hook-form';
import { useUserContext } from '../../context/UserContext';
import { postAddPilot } from '../../helpers/connections/paragliding';
import User1Img from '../../assets/img/wanna/wanna2.png';
import Avatar from '../../components/Avatar';
import Select from '../../components/bootstrap/forms/Select';
import classNames from 'classnames';
import useDarkMode from '../../hooks/useDarkMode';

interface ICustomerEditModalProps {
	id: string;
	isOpen: boolean;
	setIsOpen(...args: unknown[]): unknown;
}
const CustomerEditModal: FC<ICustomerEditModalProps> = ({ id, isOpen, setIsOpen }) => {
	const itemData = id ? data.filter((item) => item.id.toString() === id.toString()) : {};
	const item = id && Array.isArray(itemData) ? itemData[0] : {};
	const { register, handleSubmit, reset, formState: { errors }, getValues, control } = useForm();
	const { user } = useUserContext();
	const { themeStatus, darkModeStatus } = useDarkMode();

	const gender = [
		{ value:'erkek', label: 'Erkek' },
		{ value:'kadin', label: 'Kadın' }
	];


	const handleSaveAction = (data: any) => {

		console.log('gelen datalar--', data);
		// console.log('post_data', data);

	postAddPilot({ pilot : data }, user.token!)
				.then((res) => {
					reset({
						id: '',
						foto: '',
						name: '',
						surname: '',
						identityNumber: '',
						emailAddress: '',
						password: '',
						gender: '',
						phoneNumber: '',
						dateOfBirth: '',
						licenseType: '',
						issuingAuthority: '',
						licenseNumber: '',
						licenseExpirationDate: '',
						emergencyContactFullName: '',
						emergencyContactPhone: '',
						emergencyContactRelationship: ''
					});
					setIsOpen(false);

					//toast.success(`Yeni tour rezervasyon kaydı oluşturuldu`);
					// setNewItemOffcanvas(false)
				})
				.catch((err) => {
					console.log("error");
					// toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
				});
		};

	if (id || id === '0') {
		return (
			<Modal isOpen={isOpen} setIsOpen={setIsOpen}
			size='xl' titleId={id.toString()}>
				<ModalHeader setIsOpen={setIsOpen} className='p-4'>
					<ModalTitle id={id}>{item?.name || 'Pilot Ekle'}</ModalTitle>
				</ModalHeader>
				<form onSubmit={handleSubmit((data) => handleSaveAction(data))}>
				<ModalBody className='px-4'>
					<div className='row g-4'>
												<div className='col-xl-auto'>
													<Avatar src={User1Img} />
												</div>
												<div className='col-xl'>
													<div className='row g-4'>
														<div className='col-auto'>
														<FormGroup id='foto' label='Foto' isFloating>
													        <Controller name="foto"
								                                            control={control}
								                                            rules={{ required: false }}
								                                            render={({ field }) => (
																				<Input
																				type='file'
																				autoComplete='photo'
																				placeholder='Foto'
																				{...field}
																			/>
							                                                         )}
															/>
														</FormGroup>
														</div>
														<div className='col-auto'>
															<Button
																color='dark'
																isLight
																icon='Delete'>
																Delete Avatar
															</Button>
														</div>
														<div className='col-12'>
															<p className='lead text-muted'>
															Avatar, takım arkadaşlarınızın sizi tanımasına yardımcı olur.
															</p>
														</div>
													</div>
												</div>
										</div>
										<div className='row g-4'>
												<div className='col-3'>
													<FormGroup id='name' label='Ad' isFloating>
													        <Controller name="name"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='İsim'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>

													</div>
													<div className='col-3'>
													<FormGroup id='surname' label='Soyad' isFloating>
													        <Controller name="surname"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='Soyad'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
														</div>
													<div className='col-3'>
													<FormGroup id='phoneNumber' label='Telefon Numarası' isFloating>
													        <Controller name="phoneNumber"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				type='tel'
																				mask='+90 (999) 999-9999'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
														</div>
														<div className='col-3'>

												<FormGroup id='identityNumber' label='TCKN/PP' isFloating>
														<Controller name="identityNumber"
																		control={control}
																		rules={{ required: true }}
																		render={({ field }) => (
																			<Input
																			placeholder='TCKN/PP'
																			{...field}
																		/>

																				)}
														/>
													</FormGroup>
													</div>
																		<div className='col-3'>
												     <FormGroup id='emailAddress' label='E-Posta' isFloating>
													        <Controller name="emailAddress"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='E-Posta'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
													</div>
													<div className='col-3'>
												     <FormGroup id='password' label='Şifre' isFloating>
													        <Controller name="password"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='Şifre'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
													</div>

														<div className='col-3'>
												<FormGroup id='gender' label='Cinsiyet' isFloating>
											<Controller name="gender"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Select
												size='sm'
												placeholder='Seçiniz'
												ariaLabel='Seçiniz'
												list={gender.map((el: any) => ({
													value: el.value,
													text: el.label,
													label: el.label,
												}))}
												className={classNames('rounded-1', {
													'bg-white': !darkModeStatus,
												})}
											{...field}
											/>
                                             )}
                                    />
								</FormGroup>
												</div>
												<div className='col-3'>
												<FormGroup id='dateOfBirth' label='Doğum Tarihi' isFloating>
											<Controller name="dateOfBirth"
                                            rules={{ required: true }}
                                             control={ control}
                                            render={({ field }) => (
												<Input
												type='date'
												placeholder='Doğum Tarihi'
												{...field}
											/>
                                             )}
                                    />
									</FormGroup>
												</div>


						<div className='col-md-6'>
							<Card className='rounded-1 mb-0'>
								<CardHeader>
									<CardLabel icon='ReceiptLong'>
										<CardTitle>Lisans Bilgileri</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-3'>
									<div className='col-12'>
												<FormGroup id='licenseType' label='Lisans Tipi' isFloating>
													        <Controller name="licenseType"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='Lisans Tipi'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
												</div>
												<div className='col-md-12'>
												<FormGroup id='issuingAuthority' label='Düzenleyen Yetkili Makam' isFloating>
													        <Controller name="issuingAuthority"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='Düzenleyen Yetkili Makam'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
												</div>
												<div className='col-md-6'>
												<FormGroup id='licenseNumber' label='Lisans Numarası' isFloating>
													        <Controller name="licenseNumber"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='Lisans Numarası'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
												</div>
												<div className='col-md-6'>
												<FormGroup id='licenseExpirationDate' label='Lisans Son Kullanma Tarihi' isFloating>
													        <Controller name="licenseExpirationDate"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				type='date'
																				placeholder='Lisans Son Kullanma Tarihi'
																				{...field}
																			/>
							                                                         )}
															/>
														</FormGroup>
												</div>
									</div>
								</CardBody>
							</Card>
						</div>
						<div className='col-md-6'>
							<Card className='rounded-1 mb-0'>
								<CardHeader>
									<CardLabel icon='LocalShipping'>
										<CardTitle>Acil İletişim Bilgileri</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<div className='row g-3'>
									<div className='col-12'>
												<FormGroup id='emergencyContactFullName' label='İsim Soyisim' isFloating>
													        <Controller name="emergencyContactFullName"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='İsim Soyisim'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
												</div>
												<div className='col-md-12'>
												<FormGroup id='emergencyContactPhone' label='Telefon Numarası' isFloating>
													        <Controller name="emergencyContactPhone"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				type='tel'
																				mask='+90 (999) 999-9999'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
												</div>

												<div className='col-md-12'>
												<FormGroup id='emergencyContactRelationship' label='Yakınlık Durumu' isFloating>
													        <Controller name="emergencyContactRelationship"
								                                            control={control}
								                                            rules={{ required: true }}
								                                            render={({ field }) => (
																				<Input
																				placeholder='Yakınlık Durumu'
																				{...field}
																			/>

							                                                         )}
															/>
														</FormGroup>
												</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</ModalBody>
				<ModalFooter className='px-4 pb-4'>
				<Button
							color='info'
							className='w-100'
							type='submit'
							>
							Kaydet
						</Button>
				</ModalFooter>
				</form>
			</Modal>
		);
	}
	return null;
};
CustomerEditModal.propTypes = {
	id: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default CustomerEditModal;
