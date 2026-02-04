export const isPermissionSubset = (assignedPermissions, creatorPermissions) => {
    if (!assignedPermissions || !creatorPermissions) return false;
    
    return Object.keys(assignedPermissions).every(category =>
        creatorPermissions[category] && // does creator have this category?
        assignedPermissions[category].every(p => creatorPermissions[category].includes(p))  // every action exists in creator's permissions
    );
}