import React, { FC, useState } from "react";
import PropTypes from "prop-types";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../../components/bootstrap/Modal";
import data from "../data/dummyCustomerData";
import showNotification from "../../components/extras/showNotification";
import FormGroup from "../../components/bootstrap/forms/FormGroup";
import Input from "../../components/bootstrap/forms/Input";
import Button from "../../components/bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import { useUserContext } from "../../context/UserContext";

import User1Img from "../../assets/img/wanna/wanna2.png";
import Avatar from "../../components/Avatar";
import Select from "../../components/bootstrap/forms/Select";
import classNames from "classnames";
import useDarkMode from "../../hooks/useDarkMode";
import { addUsers } from "../../helpers/connections/admin";

interface ICustomerEditModalProps {
  id: string;
  isOpen: boolean;
  setIsOpen(...args: unknown[]): unknown;
}
const CustomerEditModal: FC<ICustomerEditModalProps> = ({
  id,
  isOpen,
  setIsOpen,
}) => {
  const itemData = id
    ? data.filter((item) => item.id.toString() === id.toString())
    : {};
  const item = id && Array.isArray(itemData) ? itemData[0] : {};
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    control,
  } = useForm();
  const { user } = useUserContext();
  const { themeStatus, darkModeStatus } = useDarkMode();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const gender = [
    { value: "erkek", label: "Erkek" },
    { value: "kadin", label: "Kadın" },
  ];
  // Not : Databasedeki id'ler ile eşleşmeli
  const role = [
    { value: 1, label: "Yönetici" },
    { value: 2, label: "Ofis Çalışanı" },
    { value: 3, label: "Satıcı" },
    { value: 6, label: "Operasyon Görevlisi" },
  ];

  const handleSaveAction = (data: any) => {
    const formData = new FormData();
    formData.append("image", selectedImage as File);
    formData.append("data", JSON.stringify(data));

    addUsers(formData, user.token!)
      .then((res) => {
        reset({
          id: "",
          foto: "",
          name: "",
          surname: "",
          identityNumber: "",
          emailAddress: "",
          password: "",
          gender: "",
          phoneNumber: "",
          dateOfBirth: "",
          roleId: "",
        });
        setIsOpen(false);
        showNotification(
          "success",
          "Kayıt Başarılı",
          "Kullanıcı başarıyla eklendi"
        );
      })
      .catch((err) => {
        console.log("error");
        // toast.error(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
      });
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };
  if (id || id === "0") {
    return (
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="xl"
        titleId={id.toString()}
      >
        <ModalHeader setIsOpen={setIsOpen} className="p-4">
          <ModalTitle id={id}>{item?.name || "Kullanıcı Ekle"}</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit((data) => handleSaveAction(data))}>
          <ModalBody className="px-4">
            {/* <div className="row g-4">
              <div className="col-xl-auto">
                {selectedImage && (
                  <Avatar src={URL.createObjectURL(selectedImage)} />
                )}
              </div>
              <div className="col-xl">
                <div className="row g-4">
                  <div className="col-auto">
                    <FormGroup id="foto" label="Foto" isFloating>
                      <Controller
                        name="foto"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Input
                            type="file"
                            autoComplete="photo"
                            placeholder="Foto"
                            onChange={(e: any) =>
                              field.onChange(handleImageChange(e))
                            }
                          />
                        )}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-auto">
                    <Button color="dark" isLight icon="Delete">
                      Delete Avatar
                    </Button>
                  </div>
                  <div className="col-12">
                    <p className="lead text-muted">
                      Avatar, takım arkadaşlarınızın sizi tanımasına yardımcı
                      olur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br /> */}
            <div className="row g-4">
              <div className="col-6">
                <FormGroup id="name" label="Ad" isFloating>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input placeholder="İsim" {...field} />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup id="surname" label="Soyad" isFloating>
                  <Controller
                    name="surname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input placeholder="Soyad" {...field} />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup id="phoneNumber" label="Telefon Numarası" isFloating>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input
                        type="tel"
                        mask="+90 (999) 999-9999"
                        placeholder="Tel"
                        {...field}
                      />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup id="identityNumber" label="TCKN/PP" isFloating>
                  <Controller
                    name="identityNumber"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input placeholder="TCKN/PP" {...field} />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup id="emailAddress" label="E-Posta" isFloating>
                  <Controller
                    name="emailAddress"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input placeholder="E-Posta" {...field} />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col-6">
                <FormGroup id="password" label="Şifre" isFloating>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Input placeholder="Şifre" {...field} />
                    )}
                  />
                </FormGroup>
              </div>

              <div className="col-4">
                <FormGroup id="gender" label="Cinsiyet" isFloating>
                  <Controller
                    name="gender"
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        size="sm"
                        placeholder="Seçiniz"
                        ariaLabel="Seçiniz"
                        list={gender.map((el: any) => ({
                          value: el.value,
                          text: el.label,
                          label: el.label,
                        }))}
                        className={classNames("rounded-1", {
                          "bg-white": !darkModeStatus,
                        })}
                        {...field}
                      />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col-4">
                <FormGroup id="" label="YetkiLendirme" isFloating>
                  <Controller
                    name="roleId"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        size="sm"
                        placeholder="Seçiniz"
                        ariaLabel="Seçiniz"
                        list={role.map((el: any) => ({
                          value: el.value,
                          text: el.label,
                          label: el.label,
                        }))}
                        className={classNames("rounded-1", {
                          "bg-white": !darkModeStatus,
                        })}
                        {...field}
                      />
                    )}
                  />
                </FormGroup>
              </div>
              <div className="col-4">
                <FormGroup id="dateOfBirth" label="Doğum Tarihi" isFloating>
                  <Controller
                    name="dateOfBirth"
                    rules={{ required: false }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="date"
                        placeholder="Doğum Tarihi"
                        {...field}
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="px-4 pb-4">
            <Button color="info" className="w-100" type="submit">
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
