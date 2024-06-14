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
    dob: [
        value => !!value || 'Date of birth is required',
        value => !value || new Date(value) <= new Date().setHours(0, 0, 0, 0) || 'Date of birth cannot be in the future'
      ],
    address: [value => !!value || 'Address is required'],
    city: [value => !!value || 'City is required'],
    employement_start_date: [
        value => !!value || 'start Date is required',
        value => !value || new Date(value) <= new Date().setHours(0, 0, 0, 0) || 'start Date cannot be in the future'
      ],
      employement_end_date: [
        value => !!value || 'end Date is required',
        value => !value || new Date(value) <= new Date().setHours(0, 0, 0, 0) || 'end Date cannot be in the future'
      ],
      position: [value => !!value || 'position is required']
};
