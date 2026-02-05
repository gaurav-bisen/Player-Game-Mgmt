export const isPermissionSubset = (assignedPermissions, creatorPermissions) => {
    if (!assignedPermissions || !creatorPermissions) return false;
    
    return Object.keys(assignedPermissions).every(category =>
        creatorPermissions[category] // does creator have this permission?
        && 
        assignedPermissions[category]
        .every(p => creatorPermissions[category].includes(p))  // checks every assigned permission exists in creator's permissions
    );
}

// assignedPermissions → The permissions you want to give to the new user.
// creatorPermissions → The permissions the creator (the logged-in user) has.
// The function returns true if all permissions in assignedPermissions exist in creatorPermissions. Otherwise, it returns false.