class InfoUserModal {

    FullName;Gender;CardImage;CardFileName;NationalCode;PhoneNumber;Phone;Email;PostalCode;City;UserName;Address;Year;
    Month;Day;BirthDate;EduFileName;EduImage;Parent;CountryId;AudienceId;Region;NationalCardImage;CertificateImage;emergencyCall;
    GradeId;User

    constructor() {
    }

    setName(name) {
        this.FullName = name;
    }

    setSex(sex) {
        this.Gender = sex;
    }

    setCardImage(cardImage) {
        this.CardImage = cardImage;
    }

    setCardFileName(cardFileName) {
        this.CardFileName = cardFileName;
    }

    setNationalCode(nationalCode) {
        this.NationalCode = nationalCode;
    }

    setPhoneNumber(phoneNumber) {
        this.PhoneNumber = phoneNumber;
    }

    setPhone(phone) {
        this.Phone = phone;
    }

    setEmail(email) {
        this.Email = email;
    }

    setPostalCode(postalCode) {
        this.PostalCode = postalCode;
    }

    setCity(city) {
        this.City = city;
    }

    setUserName(userName) {
        this.UserName = userName;
    }

    setAddress(address) {
        this.Address = address;
    }

    setYear(year) {
        this.Year = year;
    }

    setMonth(month) {
        this.Month = month;
    }

    setDay(day) {
        this.Day = day;
    }

    setEduFileName(eduFileName) {
        this.EduFileName = eduFileName;
    }

    setEduImage(eduImage) {
        this.EduImage = eduImage;
    }

    setParent(parent) {
        this.Parent = parent;
    }

    setCountryId(countryId) {
        this.CountryId = countryId;
    }

    setFieldId(fieldId) {
        this.AudienceId = fieldId;
    }

    setRegion(region) {
        this.Region = region;
    }

    setCertificateImage(certificateImage) {
        console.warn("certificateImage",certificateImage)
        this.CertificateImage = certificateImage;
    }

    setNationalCardImage(nationalCardImage) {
        console.warn("nationalCardImage",nationalCardImage)
        this.NationalCardImage = nationalCardImage;
    }
    setBirthDay(birthDay) {
        this.BirthDate = birthDay;
    }
    setEmergencyCall(calls){
        this.emergencyCall=calls
    }
    setGradeId(grade){
        this.GradeId=grade
    }
    setUser(user){
        this.User=user
    }

}

export default  new InfoUserModal();
