from flask import request,jsonify
from config import app, db
from models import Contact


# GET
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))

    return jsonify({"contacts" : json_contacts});


#POST
@app.route("/create_contact", methods=["POST"])
def create_contacts():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "Credentials not provided for the request"}),
            400,
            )

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)

    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User Created Succesfully!"}), 201


#dynamic routes for update by id
# PATCH
@app.route('/update_contact/<int:user_id>', methods=['PATCH'])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message":"User Id not valid or not provided"}), 404

    data = request.json
    contact.first_name = data.get("firstName",contact.first_name)
    contact.last_name = data.get("lastName",contact.last_name)
    contact.email = data.get("email",contact.email)

    db.session.commit()
    return jsonify({"message": "User updated successfully!"}), 200



# DELETE
@app.route('/delete_contact/<int:user_id>', methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message":"User Id not valid or not provided"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User Deleted Successfully!"}), 200



if __name__ == "__main__":
    #create all the models in db if you dont have yet
    with app.app_context():
        db.create_all()
    app.run(debug=True)
