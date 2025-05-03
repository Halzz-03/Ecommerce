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
  Fade,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Badge
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { brands } from "../../../data/Filter/brand";
import { teal } from "@mui/material/colors";
import { colors } from "../../../data/Filter/color";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";
import { useSearchParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [expandBrand, setExpandBrand] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState(0);

  useEffect(() => {
    setActiveFilters(searchParams.size);
  }, [searchParams]);

  const handleExpandBrand = () => {
    setExpandBrand(!expandBrand);
  };
  
  const handleExpandColor = () => {
    setExpandColor(!expandColor);
  };

  const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    searchParams.forEach((value: string, key: string) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  const handleChipClick = (name: string, value: string | number) => {
    const fakeEvent = { 
      target: { 
        name: name, 
        value: String(value) 
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    updateFilterParams(fakeEvent);
  };
  
  const isFilterActive = (name: string, value: string | number): boolean => {
    const paramValue = searchParams.get(name);
    return paramValue === String(value);
  };

  return (
    <Paper
      elevation={2}
      className="overflow-hidden bg-white rounded-xl"
      sx={{
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 128, 128, 0.12)"
        }
      }}
    >
      <Fade in={true} timeout={600}>
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-teal-600 to-teal-500">
            <div className="flex items-center gap-2">
              <FilterAltIcon sx={{ color: "white" }} />
              <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                Filters
              </Typography>
            </div>
            
            <Badge 
              badgeContent={activeFilters} 
              color="error"
              sx={{ 
                '& .MuiBadge-badge': { 
                  backgroundColor: activeFilters > 0 ? '#ff5252' : 'transparent',
                  border: activeFilters > 0 ? '2px solid white' : 'none'
                }
              }}
            >
              <Tooltip title="Clear all filters">
                <IconButton
                  onClick={clearAllFilters}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)"
                    },
                    transition: "all 0.2s ease"
                  }}
                >
                  <ClearAllIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Badge>
          </div>
          
          {/* Filter Content */}
          <div className="px-5 py-4 space-y-6">
            {/* Color Filter */}
            <div className="filter-section">
              <div className="filter-header flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <ColorLensIcon sx={{ color: teal[600], fontSize: 20 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: teal[700]
                    }}
                  >
                    Color
                  </Typography>
                </div>
                
                <Button
                  onClick={handleExpandColor}
                  size="small"
                  endIcon={expandColor ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  sx={{
                    color: teal[600],
                    textTransform: "none",
                    fontWeight: 500,
                    p: 0,
                    minWidth: "auto"
                  }}
                >
                  {expandColor ? "Less" : "More"}
                </Button>
              </div>
              
              <FormControl sx={{ width: "100%" }}>
                <Collapse in={true}>
                  <div className="grid grid-cols-2 gap-2">
                    {colors
                      .slice(0, expandColor ? colors.length : 5)
                      .map((item) => (
                        <div
                          key={item.name}
                          onClick={() => handleChipClick("color", item.name)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                            isFilterActive("color", item.name)
                              ? "bg-teal-100 border border-teal-300"
                              : "hover:bg-gray-50 border border-transparent"
                          }`}
                        >
                          <span
                            style={{ backgroundColor: item.hex }}
                            className={`h-4 w-4 rounded-full shadow-sm ${
                              isFilterActive("color", item.name)
                                ? "ring-2 ring-teal-400"
                                : ""
                            }`}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: isFilterActive("color", item.name)
                                ? teal[700]
                                : "text.secondary",
                              fontWeight: isFilterActive("color", item.name)
                                ? 600
                                : 400
                            }}
                          >
                            {item.name}
                          </Typography>
                        </div>
                      ))}
                  </div>
                </Collapse>
              </FormControl>
            </div>
            
            <Divider sx={{ backgroundColor: teal[50] }} />
            
            {/* Price Range Filter */}
            <div className="filter-section">
              <div className="filter-header mb-3 flex items-center gap-2">
                <PriceCheckIcon sx={{ color: teal[600], fontSize: 20 }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: teal[700]
                  }}
                >
                  Price Range
                </Typography>
              </div>
              
              <FormControl sx={{ width: "100%" }}>
                <RadioGroup
                  name="price"
                  onChange={updateFilterParams}
                  value={searchParams.get("price") || ""}
                  aria-labelledby="price-range"
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  {price.map((item) => (
                    <FormControlLabel
                      key={item.value}
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
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            width: '100%', 
                            alignItems: 'center'
                          }}
                        >
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: isFilterActive("price", item.value) ? teal[700] : 'text.secondary',
                              fontWeight: isFilterActive("price", item.value) ? 600 : 400
                            }}
                          >
                            {item.name}
                          </Typography>
                          
                          {isFilterActive("price", item.value) && (
                            <Chip 
                              label="Active" 
                              size="small"
                              sx={{ 
                                height: '18px',
                                fontSize: '0.625rem',
                                backgroundColor: teal[100],
                                color: teal[700],
                                fontWeight: 600
                              }}
                            />
                          )}
                        </Box>
                      }
                      sx={{
                        mx: 0,
                        my: 0.5,
                        transition: "all 0.2s ease",
                        borderRadius: "4px",
                        padding: '2px 4px',
                        "&:hover": {
                          backgroundColor: "rgba(0, 150, 136, 0.04)"
                        },
                        backgroundColor: isFilterActive("price", item.value) 
                          ? "rgba(0, 150, 136, 0.08)" 
                          : "transparent"
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            
            <Divider sx={{ backgroundColor: teal[50] }} />
            
            {/* Discount Filter */}
            <div className="filter-section">
              <div className="filter-header mb-3 flex items-center gap-2">
                <LocalOfferIcon sx={{ color: teal[600], fontSize: 20 }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: teal[700]
                  }}
                >
                  Discount
                </Typography>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {discount.map((item) => (
                  <Chip
                    key={item.name}
                    label={item.name}
                    onClick={() => handleChipClick("discount", item.value)}
                    sx={{
                      borderRadius: "16px",
                      backgroundColor: isFilterActive("discount", item.value) 
                        ? teal[500] 
                        : "rgba(0, 150, 136, 0.08)",
                      color: isFilterActive("discount", item.value) 
                        ? "white" 
                        : teal[700],
                      fontWeight: isFilterActive("discount", item.value) ? 600 : 500,
                      fontSize: "0.75rem",
                      transition: "all 0.2s ease",
                      border: `1px solid ${isFilterActive("discount", item.value) ? teal[500] : 'transparent'}`,
                      "&:hover": {
                        backgroundColor: isFilterActive("discount", item.value) 
                          ? teal[600] 
                          : "rgba(0, 150, 136, 0.15)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 2px 5px rgba(0, 150, 136, 0.2)"
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Filter Summary */}
            {activeFilters > 0 && (
              <Box 
                sx={{ 
                  mt: 3, 
                  display: "flex", 
                  justifyContent: "center" 
                }}
              >
                <Fade in={true}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={clearAllFilters}
                    startIcon={<ClearAllIcon />}
                    sx={{
                      backgroundColor: teal[500],
                      color: 'white',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: '20px',
                      boxShadow: '0 2px 6px rgba(0, 128, 128, 0.3)',
                      '&:hover': {
                        backgroundColor: teal[600],
                      }
                    }}
                  >
                    Clear {activeFilters} {activeFilters === 1 ? 'filter' : 'filters'}
                  </Button>
                </Fade>
              </Box>
            )}
          </div>
        </div>
      </Fade>
    </Paper>
  );
};

export default FilterSection;