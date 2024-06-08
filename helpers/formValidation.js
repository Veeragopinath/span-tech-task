export const validationRules = {
    required: [value => !!value || 'This field is required'],
    email: [value => /.+@.+\..+/.test(value) || 'Enter a valid email'],
    mobile: [value => !value || /^(\d+)$/.test(value) || 'Enter a valid mobile number'],
    number: [value => !value || /^(\d+)$/.test(value) || 'Enter a valid number'],
    name: [value => !!value && value.length <= 20|| 'Name must be less than' +
        ' 10 characters'],
    companyName: [value => !!value || 'Company Name is required'],
    logoUrl: [value => !!value || 'Logo URL is required'],
    password: [value => !!value && value.length >= 8 || 'Password must be at least 8 characters'],
    dob: [value => !!value || 'Date of birth is required'],
    address: [value => !!value || 'Address is required'],
    city: [value => !!value || 'City is required'],
};
