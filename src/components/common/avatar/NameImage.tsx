import React from "react";

const NameImage = ({ name }: { name: string }) => {
  return (
    <div>
      <p data-testid="name-image">{name}</p>
    </div>
  );
};

export default NameImage;
