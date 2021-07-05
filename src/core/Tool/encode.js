const encode = (x) => encodeURIComponent(x);
const decode = (x) => decodeURIComponent(x);
const loginUri = (x) => `/login/?callback=${encode(x)}`;

const encodeSet = { encode: encode, decode: decode, loginUri: loginUri };
export default encodeSet;