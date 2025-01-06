import React, { useState } from 'react';
import { AppBar, Toolbar, ButtonGroup, Button, Autocomplete } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
}));

const LogoContainer = styled('div')({
  width: '225px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
    height: '30px',
    width: 'auto',
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: '24px',
  width: '300px',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#757575',
  zIndex: 1,
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    color: '#333333',
  },
}));

const DateFilterGroup = styled(ButtonGroup)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  '& .MuiButton-root': {
    textTransform: 'none',
    color: '#666666',
    borderColor: '#e0e0e0',
    '&.active': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
}));

const UserProfile = styled('div')({
  marginLeft: 'auto',
  '& img': {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
});

// Brand options
const brands = [
  { label: 'Adidas', value: 'adidas', logo: '/assets/brands/adidas.png' },
  { label: 'Nike', value: 'nike', logo: '/assets/brands/nike.png' },
  { label: 'Reebok', value: 'reebok', logo: '/assets/brands/reebok.png' },
  { label: 'Puma', value: 'puma', logo: '/assets/brands/puma.png' },
  { label: 'Converse', value: 'converse', logo: '/assets/brands/converse.png' },
];

const Navbar = () => {
  const [activeFilter, setActiveFilter] = useState('W');
  const [selectedBrand, setSelectedBrand] = useState(brands[0]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <LogoContainer>
          <img src="/assets/logo.png" alt="MAI'STAs Logo" />
        </LogoContainer>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledAutocomplete
            value={selectedBrand}
            onChange={(event, newValue) => {
              setSelectedBrand(newValue);
            }}
            options={brands}
            defaultValue={brands[0]}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src={option.logo} 
                  alt={option.label} 
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <div ref={params.InputProps.ref} style={{ display: 'flex', alignItems: 'center' }}>
                {selectedBrand && (
                  <img
                    src={selectedBrand.logo}
                    alt={selectedBrand.label}
                    style={{
                      width: 24,
                      height: 24,
                      position: 'absolute',
                      left: 48,
                      zIndex: 1,
                    }}
                  />
                )}
                <input
                  type="text"
                  {...params.inputProps}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    height: '40px',
                    fontSize: '14px',
                    paddingLeft: selectedBrand ? '80px' : '48px',
                  }}
                  placeholder="Search brand..."
                />
              </div>
            )}
          />
        </Search>

        <DateFilterGroup size="small">
          <Button
            className={activeFilter === 'W' ? 'active' : ''}
            onClick={() => handleFilterClick('W')}
          >
            W
          </Button>
          <Button
            className={activeFilter === 'M' ? 'active' : ''}
            onClick={() => handleFilterClick('M')}
          >
            M
          </Button>
          <Button 
            className={activeFilter === '3M' ? 'active' : ''} 
            onClick={() => handleFilterClick('3M')}
          >
            3M
          </Button>
          <Button 
            className={activeFilter === '12M' ? 'active' : ''} 
            onClick={() => handleFilterClick('12M')}
          >
            12M
          </Button>
        </DateFilterGroup>

        <UserProfile>
          <img src="/assets/user_profile.png" alt="User Profile" />
        </UserProfile>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
