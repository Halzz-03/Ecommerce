import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { createDeal } from '../../../Redux Toolkit/Admin/DealSlice';

import { furnitureLevelThree } from '../../../data/category/level three/furnitureLevelThree';
import { menLevelThree } from '../../../data/category/level three/menLevelThree';
import { womenLevelThree } from '../../../data/category/level three/womenLevelThree';
import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree';
import { categoryIdMap } from './categoryId';

// ✅ Mapping category name (key) to ID

// ✅ Combine all categories into a single list
const allDealCategories = [
  ...menLevelThree,
  ...womenLevelThree,
  ...electronicsLevelThree,
  ...furnitureLevelThree
];

const CreateDealForm = () => {
  const dispatch = useAppDispatch();

  // ✅ Validation Schema using Yup
  const validationSchema = Yup.object({
    discount: Yup.number()
      .required('Discount is required')
      .min(1, 'Discount must be at least 1'),
    category: Yup.string().required('Category is required'),
  });

  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const categoryId = categoryIdMap[values.category];
      if (!categoryId) {
        console.error('Invalid category mapping');
        return;
      }

      dispatch(
        createDeal({
          discount: values.discount,
          category: {
            id: categoryId,
          },
        })
      );
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}
      className="space-y-6"
    >
      <Typography className="text-center" variant="h4" gutterBottom>
        Create Deal
      </Typography>

      {/* Discount Field */}
      <TextField
        fullWidth
        id="discount"
        name="discount"
        label="Discount"
        type="number"
        value={formik.values.discount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />

      {/* Category Select */}
      <FormControl
        fullWidth
        error={formik.touched.category && Boolean(formik.errors.category)}
        required
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          label="Category"
        >
          {allDealCategories.map((item) => (
            <MenuItem key={item.categoryId} value={item.categoryId}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>

      {/* Submit Button */}
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        sx={{ py: '.9rem' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateDealForm;
