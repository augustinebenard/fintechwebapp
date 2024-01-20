import React from 'react';
import { emptyState as empty } from '../assets/images';

export default function EmptyState() {
  return (
    <div className="text-center">
      <img src={empty} alt="empty table"  width={100} height={100}/>
      <p className="text-Z667085">There are currently no users</p>
    </div>
  );
}
