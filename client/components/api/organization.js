import { host } from '../constants'

export async function getOrganizationProjects(orgId) {
  try {
    let response = await fetch(`${host}/organizations/${orgId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let orgProjects = await response.json();

    return orgProjects;
  } catch (error) {
    console.error("There was a problem fetching organization projects:", error.message);

    return error.message;
  }
}
