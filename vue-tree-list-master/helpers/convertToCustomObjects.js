class CustomCategory {
    constructor(id, name, picture, children, products) {
        this.category111 = [];
        this.name = name;
        this.picture = picture;
        this.children = children;
        this.products = products;
    }
}
function replaceChildrenKey(result, replacementArray) {
    return result.map(category => {
        var updatedCategory = { ...category };
        const matchingCategory = replacementArray.find(category_2 => category_2.id === category.id);
        if (updatedCategory.children === undefined && matchingCategory) {
            updatedCategory.children = matchingCategory.children;
            updatedCategory.products = matchingCategory.products;
            updatedCategory.id_2 = matchingCategory.id;
        }
        if (updatedCategory.children) {
            updatedCategory.children = replaceChildrenKey(updatedCategory.children, replacementArray);

        }

        updatedCategory.dragDisabled = true;
        updatedCategory.editNodeDisabled = true;
        updatedCategory.addTreeNodeDisabled = true;
        updatedCategory.addLeafNodeDisabled = true;
        return updatedCategory;
    });
}

function convertToCustomObjects_value(categories) {
    const result = convertToCustomObjects(categories)
    const result_before = result.filter(category => {
        // Apply your condition here
        return category.pid === null; // For example, remove items with parent_id not equal to null
    });
    return replaceChildrenKey(result_before, categories)
}
function convertToCustomObjects(categories) {
    try {
        return Array.from(categories, category => {
            var children = category.children && category.children.length > 0
                ? convertToCustomObjects(category.children) : [];

            var products = category.products && category.products.length > 0
                ? category.products.map(product => ({
                    id_2: product.id,
                    name: product.name,
                    picture: product.picture,
                    pid: product.category_id,
                    count: product.num,
                    isLeaf: true,
                    editNodeDisabled: true,
                    addTreeNodeDisabled: true,
                    addLeafNodeDisabled: true,
                })) : [];

            const matchingCategory = categories.find(category_2 => category_2.id === category.id);
            if (matchingCategory && matchingCategory.children) {
                children = matchingCategory.children;
            }
            children.push(...products);
            return {
                "id": category.id,
                "id_2": category.id,
                "name": category.name,
                "picture": category.picture,
                "children": children,
                "products": products,
                "editNodeDisabled": true,
                "addTreeNodeDisabled": true,
                "addLeafNodeDisabled": true,
                "pid": category.parent_id
            };
        });
    } catch (error) {
        console.log('Error in convertToCustomObjects:', error);
        return []; // Return an empty array in case of an error
    }
}
module.exports = {
    CustomCategory,
    convertToCustomObjects,
    convertToCustomObjects_value
};