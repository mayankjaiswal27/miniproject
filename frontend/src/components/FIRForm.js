import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FIRForm = () => {
  const navigate = useNavigate(); // For navigation after successful submission

  const validationSchema = Yup.object({
    district: Yup.string().required('District is required'),
    ps: Yup.string().required('Police Station is required'),
    year: Yup.string().required('Year is required'),
    firNo: Yup.string().required('FIR No. is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/user/submit', values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('FIR submitted successfully:', response.data);
      navigate('/user/dashboard'); // Redirect to dashboard or another page upon success
    } catch (error) {
      console.error('Failed to submit FIR:', error);
    }
  };

  return (
    <Formik
      initialValues={{ district: '', ps: '', year: '', firNo: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="district">District:</label>
          <Field id="district" name="district" type="text" />
          <ErrorMessage name="district">
            {msg => <div className="error">{msg}</div>}
          </ErrorMessage>
        </div>

        <div>
          <label htmlFor="ps">Police Station:</label>
          <Field id="ps" name="ps" type="text" />
          <ErrorMessage name="ps">
            {msg => <div className="error">{msg}</div>}
          </ErrorMessage>
        </div>

        <div>
          <label htmlFor="year">Year:</label>
          <Field id="year" name="year" type="text" />
          <ErrorMessage name="year">
            {msg => <div className="error">{msg}</div>}
          </ErrorMessage>
        </div>

        <div>
          <label htmlFor="firNo">FIR No:</label>
          <Field id="firNo" name="firNo" type="text" />
          <ErrorMessage name="firNo">
            {msg => <div className="error">{msg}</div>}
          </ErrorMessage>
        </div>

        <button type="submit">Submit FIR</button>
      </Form>
    </Formik>
  );
};

// Define PropTypes for runtime validation
FIRForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default FIRForm;
