import { getCountries } from '../_lib/data-countries';

interface Country {
  name: string;
  flag: string;
}

interface SelectCountryProps {
  defaultCountry: string | undefined;
  name: string;
  id: string;
  className: string;
  
}

async function SelectCountry({ defaultCountry, name, id, className }: SelectCountryProps) {
  const countries = await getCountries();
  // let countries: Country[] = [];
  // try {
  //   countries = await getCountries() || [];
  // } catch (error) {
  //   console.error('Failed to fetch countries:', error);
  // }

  const flag = countries.find((country: Country) => country.name === defaultCountry)?.flag ?? '';
  
    
  return (
    <select
      name={name}
      id={id}
      defaultValue={flag ? `${defaultCountry}%${flag}` : ''}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c: Country) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;