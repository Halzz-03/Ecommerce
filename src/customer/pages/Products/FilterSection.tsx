import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Collapse,
  Chip,
  Box,
  Fade
} from "@mui/material";
import React, { useState } from "react";
import { brands } from "../../../data/Filter/brand";
import { teal } from "@mui/material/colors";
import { colors } from "../../../data/Filter/color";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);
  const [expendBrand, setExpendBrand] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleExpendBrand = () => {
    setExpendBrand(!expendBrand);
  };
  
  const handleExpendColor = () => {
    setExpendColor(!expendColor);
  };

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    console.log("clearAllFilters", searchParams);
    searchParams.forEach((value: any, key: any) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };
  
  // Animation variants for filter sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <Box 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      sx={{
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 70, 70, 0.1)"
        }
      }}
    >
      <Fade in={true} timeout={600}>
        <div>
          <div className="flex items-center justify-between h-[60px] px-6 bg-gradient-to-r from-teal-500 to-teal-600">
            <div className="flex items-center gap-2">
              <FilterAltIcon sx={{ color: "white" }} />
              <p className="text-xl font-bold text-white">Filters</p>
            </div>
            <Button
              onClick={clearAllFilters}
              startIcon={<ClearAllIcon />}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)"
                },
                textTransform: "none",
                borderRadius: "20px",
                boxShadow: "none"
              }}
            >
              Clear All
            </Button>
          </div>
          
          <div className="px-6 py-4 space-y-4">
            <motion.section 
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              className="filter-section"
            >
              <div className="filter-header flex justify-between items-center mb-3">
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: teal[700],
                    margin: 0
                  }}
                >
                  Color
                </FormLabel>
                <Button
                  onClick={handleExpendColor}
                  size="small"
                  endIcon={expendColor ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  sx={{
                    color: teal[600],
                    textTransform: "none",
                    fontWeight: 500,
                    p: 0,
                    minWidth: "auto"
                  }}
                >
                  {expendColor ? "Less" : "More"}
                </Button>
              </div>
              
              <FormControl sx={{ width: "100%" }}>
                <Collapse in={true}>
                  <RadioGroup
                    onChange={updateFilterParams}
                    aria-labelledby="color"
                    defaultValue=""
                    name="color"
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {colors
                      .slice(0, expendColor ? colors.length : 5)
                      .map((item, index) => (
                        <FormControlLabel
                          key={item.name}
                          value={item.name}
                          control={
                            <Radio 
                              size="small" 
                              sx={{
                                color: teal[300],
                                '&.Mui-checked': {
                                  color: teal[600],
                                },
                              }}
                            />
                          }
                          label={
                            <div className="flex items-center gap-3">
                              <span
                                style={{ backgroundColor: item.hex }}
                                className="h-5 w-5 rounded-full border shadow-sm transition-all duration-200 hover:scale-110"
                              />
                              <p className="text-gray-700 font-medium text-sm">{item.name}</p>
                            </div>
                          }
                          sx={{
                            mx: 0,
                            my: 0.5,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: "rgba(0, 150, 136, 0.04)",
                              borderRadius: "4px"
                            }
                          }}
                        />
                      ))}
                  </RadioGroup>
                </Collapse>
              </FormControl>
            </motion.section>
            
            <Divider sx={{ backgroundColor: teal[50] }} />
            
            <motion.section 
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              className="filter-section"
            >
              <div className="filter-header mb-3">
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: teal[700],
                    margin: 0
                  }}
                >
                  Price Range
                </FormLabel>
              </div>
              
              <FormControl sx={{ width: "100%" }}>
                <RadioGroup
                  name="price"
                  onChange={updateFilterParams}
                  aria-labelledby="price"
                  defaultValue=""
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  {price.map((item, index) => (
                    <FormControlLabel
                      key={item.name}
                      value={item.value}
                      control={
                        <Radio 
                          size="small" 
                          sx={{
                            color: teal[300],
                            '&.Mui-checked': {
                              color: teal[600],
                            },
                          }}
                        />
                      }
                      label={
                        <span className="text-gray-700 font-medium text-sm">{item.name}</span>
                      }
                      sx={{
                        mx: 0,
                        my: 0.5,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(0, 150, 136, 0.04)",
                          borderRadius: "4px"
                        }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </motion.section>
            
            <Divider sx={{ backgroundColor: teal[50] }} />
            
            <motion.section 
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              className="filter-section"
            >
              <div className="filter-header mb-3">
                <FormLabel
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: teal[700],
                    margin: 0
                  }}
                >
                  Discount
                </FormLabel>
              </div>
              
              <FormControl sx={{ width: "100%" }}>
                <RadioGroup
                  name="discount"
                  onChange={updateFilterParams}
                  aria-labelledby="discount"
                  defaultValue=""
                  sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}
                >
                  {discount.map((item, index) => (
                    <Chip
                      key={item.name}
                      label={item.name}
                      onClick={() => {
                        const fakeEvent = { target: { name: "discount", value: item.value } };
                        updateFilterParams(fakeEvent);
                      }}
                      sx={{
                        borderRadius: "16px",
                        backgroundColor: Number(searchParams.get("discount")) === item.value ? teal[500] : "rgba(0, 150, 136, 0.08)",
                        color: Number(searchParams.get("discount")) === item.value ? "white" : teal[700],
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: Number(searchParams.get("discount")) === item.value ? teal[600] : "rgba(0, 150, 136, 0.15)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 2px 5px rgba(0, 150, 136, 0.2)"
                        }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </motion.section>
            
            <Box 
              sx={{ 
                mt: 3, 
                display: "flex", 
                justifyContent: "center" 
              }}
            >
              <Chip
                label={`${searchParams.size} filters applied`}
                sx={{
                  display: searchParams.size > 0 ? "flex" : "none",
                  backgroundColor: teal[50],
                  color: teal[700],
                  fontWeight: "bold",
                  fontSize: "0.75rem"
                }}
              />
            </Box>
          </div>
        </div>
      </Fade>
    </Box>
  );
};

export default FilterSection;