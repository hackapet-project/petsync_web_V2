export interface Animal {
  name: string;
  species: string;
  age: string;
  breed: string;
  gender: string;
  size: string;
  weight: string;
  id?: string;
}

export const animals: Animal[] = [
  { name: 'Luna', species: 'Perro', age: '2 Años', breed: 'Labrador', gender: 'Hembra', size: 'Grande', weight: '20.4kg', id: "1", },
  { name: 'Max', species: 'Perro', age: '3 Años', breed: 'Pastor Alemán', gender: 'Macho', size: 'Grande', weight: '28.7kg', id: "2", },
  { name: 'Milo', species: 'Gato', age: '1 Año', breed: 'Europeo Común', gender: 'Macho', size: 'Mediano', weight: '4.1kg', id: "3", },
  { name: 'Nala', species: 'Gato', age: '4 Años', breed: 'Siamesa', gender: 'Hembra', size: 'Mediano', weight: '3.6kg' },
  { name: 'Toby', species: 'Perro', age: '6 Meses', breed: 'Beagle', gender: 'Macho', size: 'Mediano', weight: '7.3kg' },
  { name: 'Coco', species: 'Perro', age: '5 Años', breed: 'Caniche', gender: 'Macho', size: 'Pequeño', weight: '5.8kg' },
  { name: 'Lola', species: 'Gato', age: '3 Años', breed: 'Persa', gender: 'Hembra', size: 'Mediano', weight: '4.5kg' },
  { name: 'Rocky', species: 'Perro', age: '4 Años', breed: 'Bulldog Francés', gender: 'Macho', size: 'Mediano', weight: '12.9kg' },
  { name: 'Simba', species: 'Gato', age: '2 Años', breed: 'Maine Coon', gender: 'Macho', size: 'Grande', weight: '6.8kg' },
  { name: 'Maya', species: 'Perro', age: '1 Año', breed: 'Border Collie', gender: 'Hembra', size: 'Mediano', weight: '14.2kg' },
  { name: 'Bimba', species: 'Gato', age: '5 Años', breed: 'Bengala', gender: 'Hembra', size: 'Mediano', weight: '4.7kg' },
  { name: 'Thor', species: 'Perro', age: '3 Años', breed: 'Husky Siberiano', gender: 'Macho', size: 'Grande', weight: '25.5kg' },
  { name: 'Chispa', species: 'Perro', age: '8 Meses', breed: 'Jack Russell Terrier', gender: 'Hembra', size: 'Pequeño', weight: '6.2kg' },
  { name: 'Leo', species: 'Gato', age: '2 Años', breed: 'Azul Ruso', gender: 'Macho', size: 'Mediano', weight: '4.3kg' },
  { name: 'Sasha', species: 'Perro', age: '1 Año', breed: 'Golden Retriever', gender: 'Hembra', size: 'Grande', weight: '24.8kg' },
  { name: 'Kira', species: 'Perro', age: '7 Años', breed: 'Cocker Spaniel', gender: 'Hembra', size: 'Mediano', weight: '11.2kg' },
  { name: 'Zeus', species: 'Perro', age: '5 Años', breed: 'Rottweiler', gender: 'Macho', size: 'Grande', weight: '35.6kg' },
  { name: 'Misu', species: 'Gato', age: '3 Años', breed: 'Angora Turco', gender: 'Hembra', size: 'Mediano', weight: '3.9kg' },
  { name: 'Rex', species: 'Perro', age: '4 Años', breed: 'Doberman', gender: 'Macho', size: 'Grande', weight: '31.2kg' },
  { name: 'Lía', species: 'Gato', age: '6 Meses', breed: 'Común Europeo', gender: 'Hembra', size: 'Pequeño', weight: '2.1kg' },
  { name: 'Otto', species: 'Perro', age: '2 Años', breed: 'Schnauzer Miniatura', gender: 'Macho', size: 'Pequeño', weight: '7.5kg' },
  { name: 'Fiona', species: 'Gato', age: '2 Años', breed: 'British Shorthair', gender: 'Hembra', size: 'Mediano', weight: '4.8kg' },
  { name: 'Tina', species: 'Conejo', age: '1 Año', breed: 'Belier', gender: 'Hembra', size: 'Pequeño', weight: '2.3kg' },
  { name: 'Bruno', species: 'Perro', age: '6 Años', breed: 'Boxer', gender: 'Macho', size: 'Grande', weight: '27.9kg' },
  { name: 'Nico', species: 'Gato', age: '1 Año', breed: 'Sphynx', gender: 'Macho', size: 'Mediano', weight: '3.2kg' },
  { name: 'Duna', species: 'Perro', age: '8 Años', breed: 'Galgo Español', gender: 'Hembra', size: 'Grande', weight: '22.4kg' },
  { name: 'Tigre', species: 'Gato', age: '3 Años', breed: 'Común Atigrado', gender: 'Macho', size: 'Mediano', weight: '4.0kg' },
  { name: 'Gala', species: 'Perro', age: '5 Años', breed: 'Bóxer', gender: 'Hembra', size: 'Grande', weight: '26.1kg' },
  { name: 'Baco', species: 'Perro', age: '2 Años', breed: 'Mestizo', gender: 'Macho', size: 'Mediano', weight: '13.8kg' },
  { name: 'Daisy', species: 'Perro', age: '9 Meses', breed: 'Shih Tzu', gender: 'Hembra', size: 'Pequeño', weight: '5.1kg' },
  { name: 'Tom', species: 'Gato', age: '2 Años', breed: 'Abisinio', gender: 'Macho', size: 'Mediano', weight: '3.9kg' },
  { name: 'Greta', species: 'Perro', age: '7 Años', breed: 'San Bernardo', gender: 'Hembra', size: 'Grande', weight: '44.5kg' },
  { name: 'Pongo', species: 'Perro', age: '4 Años', breed: 'Dálmata', gender: 'Macho', size: 'Grande', weight: '24.6kg' },
  { name: 'Nube', species: 'Gato', age: '1 Año', breed: 'Común Blanco', gender: 'Hembra', size: 'Mediano', weight: '3.5kg' },
  { name: 'Runa', species: 'Perro', age: '3 Años', breed: 'Pastor Belga', gender: 'Hembra', size: 'Grande', weight: '29.1kg' },
  { name: 'Charly', species: 'Perro', age: '2 Años', breed: 'Mestizo', gender: 'Macho', size: 'Mediano', weight: '14.7kg' },
  { name: 'Pepa', species: 'Gato', age: '4 Años', breed: 'Siamesa', gender: 'Hembra', size: 'Mediano', weight: '3.8kg' },
  { name: 'Hugo', species: 'Perro', age: '5 Meses', breed: 'Mestizo', gender: 'Macho', size: 'Pequeño', weight: '5.0kg' },
  { name: 'Canela', species: 'Gato', age: '2 Años', breed: 'Común Tricolor', gender: 'Hembra', size: 'Mediano', weight: '4.2kg' },
  { name: 'Tango', species: 'Perro', age: '6 Años', breed: 'Pitbull', gender: 'Macho', size: 'Grande', weight: '30.8kg' },
  { name: 'Menta', species: 'Conejo', age: '1 Año', breed: 'Mini Rex', gender: 'Hembra', size: 'Pequeño', weight: '1.8kg' },
  { name: 'Sky', species: 'Perro', age: '3 Años', breed: 'Husky Siberiano', gender: 'Hembra', size: 'Grande', weight: '23.3kg' },
  { name: 'Romeo', species: 'Gato', age: '5 Años', breed: 'Común Gris', gender: 'Macho', size: 'Mediano', weight: '4.6kg' },
  { name: 'Karma', species: 'Perro', age: '2 Años', breed: 'Border Collie', gender: 'Hembra', size: 'Mediano', weight: '16.4kg' },
  { name: 'Arya', species: 'Gato', age: '3 Años', breed: 'Común Negro', gender: 'Hembra', size: 'Mediano', weight: '3.9kg' },
  { name: 'Duke', species: 'Perro', age: '4 Años', breed: 'Labrador Retriever', gender: 'Macho', size: 'Grande', weight: '29.0kg' },
  { name: 'Momo', species: 'Gato', age: '6 Meses', breed: 'Común Naranja', gender: 'Macho', size: 'Pequeño', weight: '2.4kg' },
  { name: 'Perla', species: 'Perro', age: '8 Años', breed: 'Mestizo', gender: 'Hembra', size: 'Mediano', weight: '18.2kg' },
  { name: 'Zoe', species: 'Gato', age: '1 Año', breed: 'Persa', gender: 'Hembra', size: 'Mediano', weight: '3.7kg' },
  { name: 'Olaf', species: 'Perro', age: '10 Meses', breed: 'Corgi Galés', gender: 'Macho', size: 'Pequeño', weight: '9.3kg' },
  { name: 'Blanca', species: 'Conejo', age: '2 Años', breed: 'Californiano', gender: 'Hembra', size: 'Pequeño', weight: '2.5kg' },
];
